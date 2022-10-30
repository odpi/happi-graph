export const mockData = {
  nodes:[
    {"id":"1","label":"Node 1","group":"RelationalColumn","properties":{"schema":"Schema","database":"Database","relationalTable":"Relational Table"},"level":0,"qualifiedName":"(host)=Host::(database)=Database::(database_schema)=Schema::(database_table)=Relational Table::(database_column)=Database Column"},
    {"id":"2","label":"Node 2","group":"GlossaryCategory","properties":{"glossary":"Glossary"},"level":0,"qualifiedName":"(category)=Category::(category)=Category"},
    {"id":"3","label":"Node 3","group":"RelationalTable","properties":{"schema":"Schema","database":"Database"},"level":0,"qualifiedName":"(host)=Host::(database)=Database::(database_schema)=Schema::(database_table)=Database Table"},
    {"id":"4","label":"Node 4","group":"RelationalColumn","properties":{"schema":"Schema","database":"Database","relationalTable":"Relational Table"},"level":0,"qualifiedName":"(host)=Host::(database)=Database::(database_schema)=Schema::(database_table)=Database Table::(database_column)=Database Column"},
    {"id":"5","label":"Node 5","group":"GlossaryCategory","properties":{"glossary":"Glossary"},"level":0,"qualifiedName":"(category)=Category::(category)=Category"},
    {"id":"6","label":"Node 6","group":"GlossaryCategory","properties":{"glossary":"Glossary"},"level":0,"qualifiedName":"(category)=Category::(category)=Category::(category)=Category"},
    {"id":"7","label":"Node 7","group":"RelationalColumn","properties":{"schema":"Schema","database":"Database","relationalTable":"Relational Table"},"level":0,"qualifiedName":"(host)=Host::(database)=Database::(database_schema)=Database Schema::(database_table)=Database Table::(database_column)=Database Column"},
    {"id":"8","label":"Node 8","group":"GlossaryTerm","properties":{"glossary":"Glossary"},"level":0,"qualifiedName":"(category)=Glossary::(category)=TEST::(term)=test_egeria"},
    {"id":"9","label":"Node 9","group":"TabularFileColumn","properties":{"schema":"Schema"},"level":0,"qualifiedName":"(host)=Host::(data_file)=Data_File.txt::(data_file_record)=Data File Record::(data_file_field)=Data file Field"},
    {"id":"10","label":"Node 10","group":"TabularFileColumn","properties":{"schema":"Schema"},"level":0,"qualifiedName":"(host)=Host::(data_file)=Data_File.txt::(data_file_record)=Data File Record::(data_file_field)=Data File Field"},
    {"id":"11","label":"Node 11","group":"GlossaryCategory","properties":{"glossary":"Glossary"},"level":0,"qualifiedName":"(category)=Category::(category)=Category::(category)=Category::(category)=Category"}
  ],
  edges:[
    {"id":"4-8","from":"4","to":"8","label":"SemanticAssignment","type":null},
    {"id":"7-8","from":"7","to":"8","label":"SemanticAssignment","type":null},
    {"id":"1-8","from":"1","to":"8","label":"SemanticAssignment","type":null},
    {"id":"8-11","from":"8","to":"11","label":"TermCategorization","type":"ReferencingCategory"},
    {"id":"8-2","from":"8","to":"2","label":"TermCategorization","type":"ReferencingCategory"},
    {"id":"3-8","from":"3","to":"8","label":"SemanticAssignment","type":null},
    {"id":"8-6","from":"8","to":"6","label":"TermCategorization","type":"ReferencingCategory"},
    {"id":"10-8","from":"10","to":"8","label":"SemanticAssignment","type":null},
    {"id":"9-8","from":"9","to":"8","label":"SemanticAssignment","type":null},
    {"id":"8-5","from":"8","to":"5","label":"TermCategorization","type":"PrimaryCategory"}
  ]
};
