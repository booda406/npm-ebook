class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

  def current_user
  	@current_user ||= User.find(session[:user_id]) if session[:user_id]
  end



  # -*- coding: utf-8 -*-
  def ebook_test
  	# -------first--------
	# builder = GEPUB::Builder.new {
	#   language 'en'
	#   unique_identifier 'http:/example.jp/bookid_in_url', 'BookID', 'URL'
	#   title 'GEPUB Sample Book'
	#   subtitle 'This book is just a sample'

	#   creator 'KOJIMA Satoshi'

	#   contributors 'Denshobu', 'Asagaya Densho', 'Shonan Densho Teidan', 'eMagazine Torutaru'

	#   date '2012-02-29T00:00:00Z'

	#   resources(:workdir => '~/epub/sample_book_source/') {
	#     cover_image 'img/image1.jpg' => 'image1.jpg'
	#     ordered {
	#       file 'text/chap1.xhtml'
	#       heading 'Chapter 1'

	#       file 'text/chap1-1.xhtml'

	#       file 'text/chap2.html'
	#       heading 'Chapter 2'
	#     }
	#   }
	# }
	# epubname = File.join(File.dirname(__FILE__), 'example_test_with_builder.epub')
	# builder.generate_epub(epubname)
	# -----------second---------
  #   workdir = 'epub/example/'
  #   builder = GEPUB::Builder.new {
  #     unique_identifier 'http:/example.jp/bookid_in_url', 'BookID', 'URL'
  #     language 'en'

  #     title 'GEPUB Sample Book'
  #     subtitle 'This book is just a sample'
  #     alt 'ja' => 'これはあくまでサンプルです'

  #     creator 'KOJIMA Satoshi'
  #     alt 'ja' => '小嶋智'

  #     contributors 'Denshobu', 'Asagaya Densho', 'Shonan Densho Teidan', 'eMagazine Torutaru'

  #     date '2012-02-29T00:00:00Z'

  #     resources(:workdir => workdir) {
  #       cover_image 'img/image1.jpg' => 'image1.jpg'
  #       ordered {
  #         file 'text/chap1.xhtml'
  #         heading 'Chapter 1'
  #         file 'text/chap1-1.xhtml'
  #         file 'text/chap2.html'
  #         heading 'Chapter 2'
  #       }
  #     }
  #   }
  #   epubname = File.join(File.dirname(__FILE__), 'example_test_with_builder.epub')
  #   builder.generate_epub(epubname)  	
  # -------third-------
  book = GEPUB::Book.new
	book.set_main_id('http:/example.jp/bookid_in_url', 'BookID', 'URL')
	book.language = 'ja'

	# you can add metadata and its property using block
	book.add_title('故宮測試', nil, GEPUB::TITLE_TYPE::MAIN) {
	  |title|
	  title.lang = 'ja'
	  title.file_as = 'GEPUB Sample Book'
	  title.display_seq = 1
	  title.add_alternates(
	                       'en' => 'GEPUB Sample Book (Japanese)',
	                       'el' => 'GEPUB δείγμα (Ιαπωνικά)',
	                       'th' => 'GEPUB ตัวอย่าง (ญี่ปุ่น)')
	}
	# you can do the same thing using method chain
	book.add_title('これはあくまでサンプルです',nil, GEPUB::TITLE_TYPE::SUBTITLE).set_display_seq(1).add_alternates('en' => 'this book is just a sample.')
	book.add_creator('小嶋智') {
	  |creator|
	  creator.display_seq = 1
	  creator.add_alternates('en' => 'KOJIMA Satoshi')
	}
	book.add_contributor('電書部').set_display_seq(1).add_alternates('en' => 'Denshobu')
	book.add_contributor('アサガヤデンショ').set_display_seq(2).add_alternates('en' => 'Asagaya Densho')
	book.add_contributor('湘南電書鼎談').set_display_seq(3).add_alternates('en' => 'Shonan Densho Teidan')
	book.add_contributor('電子雑誌トルタル').set_display_seq(4).add_alternates('en' => 'eMagazine Torutaru')

	imgfile = File.join(File.dirname(__FILE__),  'img', 'image1.jpg')
	File.open(imgfile) do
	  |io|
	  book.add_item('img/image1.jpg',io).cover_image
	end

	# within ordered block, add_item will be added to spine.
	book.ordered {
	  book.add_item('text/chap1.xhtml').add_content(StringIO.new('<html xmlns="http://www.w3.org/1999/xhtml"><head><title>c1</title></head><body><p>第一展區</p></body></html>')).toc_text('Chapter 1') 
	  book.add_item('text/chap1-1.xhtml').add_content(StringIO.new('<html xmlns="http://www.w3.org/1999/xhtml"><head><title>c2</title></head><body><p>第二展區</p><h1>heelo~~</h1></body></html>')) # do not appear on table of contents
	  book.add_item('text/chap2.xhtml').add_content(StringIO.new('<html xmlns="http://www.w3.org/1999/xhtml"><head><title>c3</title></head><body><p>第三展區</p></body></html>')).toc_text('Chapter 2')
	  # to add nav file:
	  # book.add_item('path/to/nav').add_content(nav_html_content).add_property('nav')
	}
	epubname = File.join(File.dirname(__FILE__), '故宮.epub')

	# if you do not specify your own nav document with add_item, 
	# simple navigation text will be generated in generate_epub.
	# auto-generated nav file will not appear on spine.
	book.generate_epub(epubname)
  end

end
