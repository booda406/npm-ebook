class EpubController < ApplicationController

	def mybooks
		if !@current_user.nil?
			@books = Book.where(user_id: current_user.id)
		else
			@books = Book.all
		end
	end

	def index

	end

	def image_library
		@images = Image.all
	end

	def image_new
		@image = Image.new
	end

	def image_create
		@image = Image.new(image_params)
		@image.save
		redirect_to image_library_path
	end

	def book_new
		@book = Book.new
	end

	def book_create
		@book = Book.new(book_params)
		if current_user?
			@book.user_id = current_user.id			
		end
		@book.save
		@@epub = @book
		builder = GEPUB::Builder.new {
		  language 'en'
		  unique_identifier 'http:/example.jp/bookid_in_url', 'BookID', 'URL'
		  title @@epub.index_word
		  subtitle '我只為了測試'

		  creator @@epub.creator

		  contributors @@epub.second_friend

		  date Time.now

		  resources(:workdir => "#{Rails.root}/") {
		    cover_image 'public/' + @@epub.index_image.url

		    file 'app/controllers/css/stylesheet.css'
		    glob 'app/controllers/fonts/*.otf'
 			@@epub.pages.each do |page|
 				if  !page.image.url.nil?
 					file 'public/' + page.image.url
 				end
 			end
 			file 'public' + @@epub.together_photo.url
 			file 'public' + @@epub.last_image.url

			# nav 'text/toc.xhtml'

		    ordered {
		      @book.add_item('second.xhtml').add_content(StringIO.new('<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><head><meta http-equiv="Cache-Control" content="no-store" /><link rel="stylesheet" type="text/css" href="app/controllers/css/stylesheet.css" /><title>Second</title></head><body><p>天氣:'+@@epub.second_weather+'</p><p>心情:'+@@epub.second_mood+'</p><p>朋友:'+@@epub.second_friend+'</p></body></html>'))
		      @@epub.pages.each_with_index do |page, index|
		      	if page.image.url.nil?
					@book.add_item('chap'+ index.to_s + '.xhtml').add_content(StringIO.new('<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><head><meta http-equiv="Cache-Control" content="no-store" /><link rel="stylesheet" type="text/css" href="app/controllers/css/stylesheet.css" /><title>'+ page.title + '</title></head><body><p>'+ page.word + '</p></body></html>'))
		      	else
					@book.add_item('chap'+ index.to_s + '.xhtml').add_content(StringIO.new('<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><head><meta http-equiv="Cache-Control" content="no-store" /><link rel="stylesheet" type="text/css" href="app/controllers/css/stylesheet.css" /><title>'+ page.title + '</title></head><body><p>'+ page.word + '</p><img src="public' + page.image.url + '" /></body></html>'))
				end
		      end
		      @book.add_item('together_photo.xhtml').add_content(StringIO.new('<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><head><meta http-equiv="Cache-Control" content="no-store" /><link rel="stylesheet" type="text/css" href="app/controllers/css/stylesheet.css" /><title>TogetherPhoto</title></head><body><img src="public'+@@epub.together_photo.url+'" /></body></html>'))
		      @book.add_item('last_image.xhtml').add_content(StringIO.new('<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><head><meta http-equiv="Cache-Control" content="no-store" /><link rel="stylesheet" type="text/css" href="app/controllers/css/stylesheet.css" /><title>LastImage</title></head><body><img src="public'+@@epub.last_image.url+'" /><p>作者:'+@@epub.creator+'</p><p>時間:'+Time.now.to_s+'</p></body></html>'))
		      file 'app/controllers/text/chap2-1.xhtml'
		    }
		  }
		}
		epubname = File.join("#{Rails.root}/public", '故宮'+@book.id.to_s+'.epub')
		builder.generate_epub(epubname)
		# send_file("#{Rails.root}/public/故宮.epub")
		path = "#{Rails.root}/public/故宮"+@book.id.to_s+".epub"
		logger.debug "pathhhhh #{path}"
		Zip::File.open(path) { |zip_file|
			logger.debug "fiiiiiiiiiiiile #{zip_file.to_s.split('/')[-1]}"
     		zip_file.each { |f|
     			f_path=File.join("#{Rails.root}/public/故宮"+@book.id.to_s, f.name)
     			FileUtils.mkdir_p(File.dirname(f_path))
     			zip_file.extract(f, f_path) unless File.exist?(f_path)
   			}
   		}

   		respond_to do |format|
	      format.html { redirect_to books_show_path(@book.id) }
	      format.json { render json: @book.id }
    	end

	end

	def book_show
		@book = Book.find(params[:id])
		render layout: false
	end

	def book_update
		#{"editor1"=>"<p>天氣:U know it</p>\r\n\r\n<p>心情:well... its hard to say</p>\r\n\r\n<p>朋友:Mm.......</p>\r\n",
		# "chapter_path"=>"http://localhost:3000/故宮49/OEBPS/second.xhtml",
		# "id"=>"49"}
		@body_content = params[:editor1]
		# render text: @body_content
		@book_id = params[:id]
		@file_path = "public" + params[:chapter_path]
		new_doc = Nokogiri::HTML(@body_content)
		new_doc.css('img').each do |img|
			if img['src'].include? "http:"
				img['src'] = "public" + img['src'].split("public")[1]
			else
				copy_with_path("public" + img['src'], @file_path.sub(/\/[^\/]*$/, '')+"/public"+img['src'])
				img['src'] = "public" + img['src']
			end
			logger.debug "IMGGGG #{img['src']}"
		end
		logger.debug "FIIIIILE #{new_doc.at('body').inner_html}"
		doc = Nokogiri::XML(File.open(@file_path))
		# doc.at('body').content = @body_content
		doc.css('body').first.inner_html = new_doc.at('body').inner_html
		File.open(@file_path, 'w') {|f| f.write doc}
		# logger.debug "File #{doc}"
		redirect_to books_show_path(@book_id)
	end

	def generate_ebook
		@book = Book.find(params[:id]) || Book.last

		directory = "#{Rails.root}/public/故宮"+@book.id.to_s+"/" # last slash could be omitted
		zipfile_name = "#{Rails.root}/public/故宮"+@book.id.to_s+".epub"

		options = {"directories-recursively"=>true}

		
		Zip::File.open(zipfile_name, Zip::File::CREATE) do |zipfile|
		    Dir[File.join(directory, '**', '**')].each do |file|
		      zipfile.add(file.sub(directory, ''), file)
		    end
		end

	  send_file("#{Rails.root}/public/故宮"+@book.id.to_s+".epub")
	end

	def download_image
		@name = params[:name]
		send_file(
		  "#{Rails.root}/app/assets/images/"+@name+".jpg",
		  filename: @name,
		  type: "image/jpeg"
		) and return

	end

	private

	def image_params
		params.require(:image).permit(:image)
	end

	def book_params
		params.require(:book).permit(:index_word, :index_image, :second_weather, :second_mood, :second_friend, :together_photo, :creator, :last_image, pages_attributes: [ :id, :title, :word, :image, :_destroy ])
	end

	def copy_with_path(src, dst)
	  FileUtils.mkdir_p(File.dirname(dst))
	  FileUtils.cp(src, dst)
	end

end
