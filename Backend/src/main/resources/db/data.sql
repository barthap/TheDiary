insert into Type values
  ('S', 'Story'),
  ('F', 'File'),
  ('D', 'Document'),
  ('P', 'Person'),
  ('I', 'Photo/Video');

insert into Items (ItemId, TypeCode, CreatedDateTime, UpdatedDateTime)  values
  (null, 'S', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 'F', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 'F', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 'I', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 'P', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (null, 'D', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

insert into Story (StoryId, StoryDateTime, Header, Content) values
  (1 , CURRENT_TIMESTAMP, 'Some story', 'The story content');

insert into Files (FileId, Filename, Title, Description) values
  (2, 'file.tmp', 'File 1', 'Some file description'),
  (3, 'file2.tmp', 'File 2', 'Other temp desc');

insert into Photos (PhotoId, Filename, Title, Description) values
  (4, 'photo.jpg', 'Dummy photo', 'Photo desc');

insert into People (PersonId, FullName, BirthDate, Description) values
  (5, 'Eustachy Motyka', DATE('1999-10-29'), 'Hehe data');

insert into Documents (DocumentId, Title, Type, Filename, Content) VALUES
  (6, 'Protected', 'EXTERNAL', 'protected.docx', null);

insert into Reference (ReferenceId, SourceId, TargetId) values
  (null, 1, 2),
  (null, 3, 1),
  (null, 4, 1),
  (null, 4, 5),
  (null, 5, 3),
  (null, 6, 1),
  (null, 5, 2),
  (null, 2, 5),
  (null, 2, 6);
