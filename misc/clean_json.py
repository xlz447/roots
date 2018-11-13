import json
from pprint import pprint

with open ('../app/data/pics.json') as f:
	data = json.load(f)


for i, image in enumerate(data['images']):
	for tag in image['tags']:
		# data['images'][i]['tags'][tag.lower()] = data['images'][i]['tags'][tag]
		# del data['images'][i]['tags'][tag]
		# pprint(data)
		# tag = tag.lower()
		data['images'][i]['tags'][tag]	= data['images'][i]['tags'][tag].replace(',', '.')
		try:
			data['images'][i]['tags'][tag] = int(data['images'][i]['tags'][tag])
		except:
			data['images'][i]['tags'][tag] = float(data['images'][i]['tags'][tag])


with open ('../app/data/pics.json', 'w') as f:
	json.dump(data, f)