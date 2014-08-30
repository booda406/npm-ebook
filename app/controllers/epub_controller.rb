class EpubController < ApplicationController

	def index
		@word = params[:word] if params[:word].present?
		render layout: false
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

	def generate_ebook
		builder = GEPUB::Builder.new {
		  language 'en'
		  unique_identifier 'http:/example.jp/bookid_in_url', 'BookID', 'URL'
		  title '故宮測試'
		  subtitle '我只為了測試'

		  creator 'Steven'

		  contributors 'Robert', 'Peter'

		  date Time.now

		  resources(:workdir => "#{Rails.root}/app/controllers/") {
 			glob 'img/*.jpg' # means files(Dir.glob('img/*.jpg'))
		    cover_image 'img/image1.jpg'
		    file 'css/stylesheet.css'
		    glob 'fonts/*.otf'
 
			nav 'text/toc.xhtml'

		    ordered {
		      file 'text/chap1.xhtml'
		      heading 'Chapter 1'

		      file 'text/chap1-1.xhtml'

		      file 'text/chap2.xhtml'
		      file 'text/chap2-1.xhtml'
		    }
		  }
		}
		epubname = File.join("#{Rails.root}/public", '故宮.epub')
		builder.generate_epub(epubname)
		send_file("#{Rails.root}/public/故宮.epub")
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

end
