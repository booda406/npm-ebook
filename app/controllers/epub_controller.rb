class EpubController < ApplicationController

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
		# @book = Book.new(book_params)
		# @book.save
		# @@epub = Book.first
		# builder = GEPUB::Builder.new {
		#   language 'en'
		#   unique_identifier 'http:/example.jp/bookid_in_url', 'BookID', 'URL'
		#   title @@epub.index_word
		#   subtitle '我只為了測試'

		#   creator @@epub.creator

		#   contributors @@epub.second_friend

		#   date Time.now

		#   resources(:workdir => "#{Rails.root}/") {
		#     cover_image 'public/' + @@epub.index_image.url
		#     file 'app/controllers/css/stylesheet.css'
		#     glob 'app/controllers/fonts/*.otf'
 	# 		@@epub.pages.each do |page|
 	# 			if  !page.image.url.nil?
 	# 				file 'public/' + page.image.url
 	# 			end
 	# 		end
 	# 		file 'public' + @@epub.together_photo.url
 	# 		file 'public' + @@epub.last_image.url

		# 	# nav 'text/toc.xhtml'

		#     ordered {
		#       @book.add_item('second.xhtml').add_content(StringIO.new('<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><head><link rel="stylesheet" type="text/css" href="app/controllers/css/stylesheet.css" /><title>Second</title></head><body><p>天氣:'+@@epub.second_weather+'</p><p>心情:'+@@epub.second_mood+'</p><p>朋友:'+@@epub.second_friend+'</p></body></html>'))
		#       @@epub.pages.each_with_index do |page, index|
		#       	if page.image.url.nil?
		# 			@book.add_item('chap'+ index.to_s + '.xhtml').add_content(StringIO.new('<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><head><link rel="stylesheet" type="text/css" href="app/controllers/css/stylesheet.css" /><title>'+ page.title + '</title></head><body><p>'+ page.word + '</p></body></html>'))
		#       	else
		# 			@book.add_item('chap'+ index.to_s + '.xhtml').add_content(StringIO.new('<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><head><link rel="stylesheet" type="text/css" href="app/controllers/css/stylesheet.css" /><title>'+ page.title + '</title></head><body><p>'+ page.word + '</p><img src="public' + page.image.url + '" /></body></html>'))
		# 		end
		#       end
		#       @book.add_item('together_photo.xhtml').add_content(StringIO.new('<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><head><link rel="stylesheet" type="text/css" href="app/controllers/css/stylesheet.css" /><title>TogetherPhoto</title></head><body><img src="public'+@@epub.together_photo.url+'" /></body></html>'))
		#       @book.add_item('last_image.xhtml').add_content(StringIO.new('<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><head><link rel="stylesheet" type="text/css" href="app/controllers/css/stylesheet.css" /><title>LastImage</title></head><body><img src="public'+@@epub.last_image.url+'" /><p>作者:'+@@epub.creator+'</p><p>時間:'+Time.now.to_s+'</p></body></html>'))
		#       # file 'text/chap1.xhtml'
		#       # heading 'Chapter 1'

		#       # file 'text/chap1-1.xhtml'

		#       # file 'text/chap2.xhtml'
		#       file 'app/controllers/text/chap2-1.xhtml'
		#     }
		#   }
		# }
		# epubname = File.join("#{Rails.root}/public", '故宮.epub')
		# builder.generate_epub(epubname)
		# send_file("#{Rails.root}/public/故宮.epub")
	end

	def book_create
		@book = Book.new(book_params)
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
		      @book.add_item('second.xhtml').add_content(StringIO.new('<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><head><link rel="stylesheet" type="text/css" href="app/controllers/css/stylesheet.css" /><title>Second</title></head><body><p>天氣:'+@@epub.second_weather+'</p><p>心情:'+@@epub.second_mood+'</p><p>朋友:'+@@epub.second_friend+'</p></body></html>'))
		      @@epub.pages.each_with_index do |page, index|
		      	if page.image.url.nil?
					@book.add_item('chap'+ index.to_s + '.xhtml').add_content(StringIO.new('<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><head><link rel="stylesheet" type="text/css" href="app/controllers/css/stylesheet.css" /><title>'+ page.title + '</title></head><body><p>'+ page.word + '</p></body></html>'))
		      	else
					@book.add_item('chap'+ index.to_s + '.xhtml').add_content(StringIO.new('<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><head><link rel="stylesheet" type="text/css" href="app/controllers/css/stylesheet.css" /><title>'+ page.title + '</title></head><body><p>'+ page.word + '</p><img src="public' + page.image.url + '" /></body></html>'))
				end
		      end
		      @book.add_item('together_photo.xhtml').add_content(StringIO.new('<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><head><link rel="stylesheet" type="text/css" href="app/controllers/css/stylesheet.css" /><title>TogetherPhoto</title></head><body><img src="public'+@@epub.together_photo.url+'" /></body></html>'))
		      @book.add_item('last_image.xhtml').add_content(StringIO.new('<?xml version="1.0" encoding="UTF-8"?><html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops"><head><link rel="stylesheet" type="text/css" href="app/controllers/css/stylesheet.css" /><title>LastImage</title></head><body><img src="public'+@@epub.last_image.url+'" /><p>作者:'+@@epub.creator+'</p><p>時間:'+Time.now.to_s+'</p></body></html>'))
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

	def generate_ebook
		@book = Book.find(params[:id]) || Book.last
		# builder = GEPUB::Builder.new {
		#   language 'en'
		#   unique_identifier 'http:/example.jp/bookid_in_url', 'BookID', 'URL'
		#   title '故宮測試'
		#   subtitle '我只為了測試'

		#   creator 'Steven'

		#   contributors 'Robert', 'Peter'

		#   date Time.now

		#   resources(:workdir => "#{Rails.root}/app/controllers/") {
 	# 		glob 'img/*.jpg' # means files(Dir.glob('img/*.jpg'))
		#     cover_image 'img/image1.jpg'
		#     file 'css/stylesheet.css'
		#     glob 'fonts/*.otf'
 
		# 	# nav 'text/toc.xhtml'

		#     ordered {
		#       file 'text/chap1.xhtml'
		#       heading 'Chapter 1'

		#       file 'text/chap1-1.xhtml'

		#       file 'text/chap2.xhtml'
		#       file 'text/chap2-1.xhtml'
		#     }
		#   }
		# }
		# epubname = File.join("#{Rails.root}/public", '故宮.epub')
		# builder.generate_epub(epubname)
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

end
