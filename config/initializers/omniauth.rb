OmniAuth.config.logger = Rails.logger
 
Rails.application.config.middleware.use OmniAuth::Builder do
	provider :facebook, '335675023267559', '69c9b53e43d273653aa2d2d24f3ae2e0', {:client_options => {:ssl => {:ca_file => Rails.root.join("cacert.pem").to_s}}}
end