#!/usr/bin/env python

#import the CSV module for dealing with CSV files
import csv

#create a 'reader' variable, which allows us to play with the contents of the CSV file
#in order to do that, we create the ifile variable, open the CSV file into that, then pass its' contents into the reader variable.
ifile = open('csv/filmes.csv', 'rb')
reader = csv.reader(ifile)

#create a new variable called 'outfile' (could be any name), which we'll use to create a new file that we'll pass our TTL into.
outfile = open('turtle/filmes.ttl', 'a')

#get python to loop through each row in the CSV, and ignore the first row.
rownum = 0
for row in reader:
	if rownum == 0: # or rownum == 1: # if it's the first row, then ignore it, move on to the next one.
		pass
	else: # if it's not the first row, place the contents of the row into the 'c' variable, then create a 'd' variable with the stuff we want in the file.		
		# f","fname","dir","music","writer","country","lang"
		c = row
		f = c[0].split('/')
		d = c[2].split('/')
		comp = c[3].split('/')
		w = c[4].split('/')

		entry = ""

		entry = "###  http://www.semanticweb.org/diogosilva117/ontologies/2020/cinema#" + f[4] + "\n"
		entry += ":" + f[4] + " rdf:type owl:NamedIndividual ,\n\t\t\t\t\t\t\t"
		entry += ":Filme ;\n\t\t\t\t"
		entry += ":realizou :" + d[4] + " ;\n\t\t\t\t"
		entry += ":foiComposta :" + comp[4] + " ;\n\t\t\t\t"
		entry += ":foiEscrito :" + w[4] + " ;\n\t\t\t\t"
		entry += ":temPaisOrigem \"" + c[5] + "\" ;\n\t\t\t\t"
		entry += ":lingua \"" + c[6] + "\" .\n\n"

		outfile.write(entry)	# now write the d variable into the file
	rownum += 1 # advance the row number so we can loop through again with the next row

# finish off by closing the two files we created

outfile.close()
ifile.close()