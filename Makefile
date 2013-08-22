env:
	virtualenv env
	./env/bin/pip install -r requirements.txt

clean:
	rm -rf env

run: env
	./env/bin/aspen --network_address=0.0.0.0:3333 \
				    --www_root=www/ \
					--project_root=.
