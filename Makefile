env:
	virtualenv-2.7 env
	./env/bin/pip-2.7 install -r requirements.txt

clean:
	rm -rf env

run: env
	./env/bin/aspen --network_address=0.0.0.0:3333 \
				    --www_root=www/ \
					--project_root=.
