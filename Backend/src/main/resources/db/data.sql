insert into Type values
  ('S', 'Story'),
  ('F', 'File'),
  ('D', 'Document'),
  ('P', 'Person'),
  ('I', 'Photo/Video');

insert into Items (ItemId, TypeCode, CreatedDateTime, UpdatedDateTime)  values
  (1, 'S', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (2, 'F', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (3, 'F', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (4, 'I', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (5, 'P', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (6, 'D', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (7, 'S', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (8, 'P', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (9, 'P', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (10, 'D', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (11, 'F', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (12, 'P', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (13, 'I', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (14, 'I', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (15, 'I', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (16, 'I', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
  (17, 'I', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

insert into Story (StoryId, StoryDateTime, Header, Content) values
  (1 , DATE('2015-07-12'), 'Sample story', '_**Hello, this is an example story that never happened!**_

​

Ut non ex eu velit lobortis cursus. Nulla sodales justo id nisl dapibus fringilla. Curabitur sit amet nisl eget sem porta sagittis. Ut iaculis imperdiet posuere. Praesent nulla mi, varius quis vulputate nec, dictum eget felis. Praesent non felis ut massa sodales lacinia. Pellentesque nec nulla turpis. Donec scelerisque varius ipsum quis tincidunt. Donec lacinia, magna lobortis euismod luctus, augue diam maximus arcu, id finibus lacus ante eget elit. Duis aliquet felis sit amet velit porta facilisis. Pellentesque eget gravida orci. Etiam tempor nibh sed est sodales, a scelerisque erat auctor. Mauris feugiat elit congue, accumsan odio ac, varius ipsum. Fusce pellentesque ligula a nisi congue sodales. Phasellus porta dui in lectus dictum, tincidunt vehicula nisl consectetur. Duis ultricies sodales tempus.

Morbi placerat tempus ipsum, a sagittis sem pulvinar in. Mauris elit turpis, posuere eu pulvinar vitae, consectetur vel ex. Aliquam at tincidunt arcu, non lacinia diam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec hendrerit vitae dolor eget interdum. Donec nec erat sed mi tempor eleifend a bibendum turpis. Etiam accumsan augue a odio venenatis, ac posuere arcu tincidunt. Integer ante mi, efficitur vel tortor a, sagittis finibus felis.
'),
  (7, DATE('2018-09-20'), 'Another story', '### Lorem ipsum

Some _example story content_

**Header Lorem**

 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque leo arcu, et iaculis dui aliquet eu. In et magna eget elit placerat posuere. Mauris sodales, ante vitae cursus bibendum, mi dui venenatis tortor, a porta urna lectus at ante. Etiam porta, quam vitae dignissim rhoncus, augue est bibendum quam, ac varius nisl lacus at velit. Sed vestibulum libero ac sagittis venenatis. Integer non nibh eros. Donec laoreet pulvinar diam, in maximus libero vestibulum eget. Quisque a ultricies neque. Vestibulum consequat orci et ultricies accumsan. Donec volutpat orci neque, gravida scelerisque urna pretium vitae. Nulla volutpat, massa nec consectetur tristique, eros arcu interdum sapien, sodales vulputate erat sem vel risus. Praesent dolor diam, tempus sed arcu eget, maximus vestibulum justo. Aliquam ornare sollicitudin fringilla. Vivamus semper, purus non vestibulum varius, mi felis egestas sem, non sodales magna turpis non lacus. Cras arcu dui, iaculis a aliquam et, cursus a ipsum. In rhoncus volutpat iaculis.
');

insert into Files (FileId, Filename, Title, Description) values
  (2, 'file.tmp', 'File 1', 'This file actually **does not** exist'),
  (3, 'file2.tmp', 'File 2', 'Other temp _non-existing file'),
  (11, 'archive.zip', 'A Zip archive', 'Archive description');

insert into Photos (PhotoId, Filename, Title, Description) values
  (4, 'example-photo-1.jpg', 'Example photo', 'This is a photo description.

The photo has been downloaded from [https://unsplash.com/search/photos/sample](https://unsplash.com/search/photos/sample)
'),
  (13, 'example-photo-2.jpg', 'Buses', 'This is a photo description.

The photo has been downloaded from [https://unsplash.com/search/photos/sample](https://unsplash.com/search/photos/sample)
'),
  (14, 'example-photo-3.jpg', 'Example photo 3', 'This is a photo description.

The photo has been downloaded from [https://unsplash.com/search/photos/sample](https://unsplash.com/search/photos/sample)
'),
  (15, 'example-photo-4.jpg', 'Paris', 'This is a photo description.

The photo has been downloaded from [https://unsplash.com/search/photos/sample](https://unsplash.com/search/photos/sample)
'),

  (16, 'example-photo-5.jpg', 'Example photo 5', 'This is a photo description.

The photo has been downloaded from [https://unsplash.com/search/photos/sample](https://unsplash.com/search/photos/sample)
'),

  (17, 'example-photo-7.jpg', 'A laptop', 'This is a photo description.

The photo has been downloaded from [https://unsplash.com/search/photos/sample](https://unsplash.com/search/photos/sample)
');


insert into People (PersonId, FullName, BirthDate, Description) values
  (5, 'John Smith', DATE('1979-10-29'), 'Example _person_'),
  (8, 'Benjamin Henderson', DATE('1981-05-14'), 'Person created using random name generator'),
  (9, 'Bob Hunter', DATE('1975-01-08'), 'This is also randomly generated name'),
  (12, 'Samuel Austin', DATE('1990-12-11'), 'This name is also generated, [https://www.fantasynamegenerators.com/english_names.php](https://www.fantasynamegenerators.com/english_names.php)
');

insert into Documents (DocumentId, Title, Type, Filename, Content) VALUES
  (6, 'Task list', 'EXTERNAL', 'tasks.docx', null),
  (10, 'Embedded document', 'EMBEDDED', null, '## Document title

Documents could also be **embedded** and use _markdown_ syntax!

 > This is a sample quote

### Subtitle

 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pellentesque leo arcu, et iaculis dui aliquet eu. In et magna eget elit placerat posuere. Mauris sodales, ante vitae cursus bibendum, mi dui venenatis tortor, a porta urna lectus at ante. Etiam porta, quam vitae dignissim rhoncus, augue est bibendum quam, ac varius nisl lacus at velit. Sed vestibulum libero ac sagittis venenatis. Integer non nibh eros. Donec laoreet pulvinar diam, in maximus libero vestibulum eget. Quisque a ultricies neque. Vestibulum consequat orci et ultricies accumsan. Donec volutpat orci neque, gravida scelerisque urna pretium vitae. Nulla volutpat, massa nec consectetur tristique, eros arcu interdum sapien, sodales vulputate erat sem vel risus. Praesent dolor diam, tempus sed arcu eget, maximus vestibulum justo. Aliquam ornare sollicitudin fringilla. Vivamus semper, purus non vestibulum varius, mi felis egestas sem, non sodales magna turpis non lacus. Cras arcu dui, iaculis a aliquam et, cursus a ipsum. In rhoncus volutpat iaculis.
');

insert into Reference (ReferenceId, SourceId, TargetId) values
  (null, 5, 10),
  (null, 14, 16),
  (null, 11, 8),
  (null, 9, 7),
  (null, 6, 12),
  (null, 1, 4),
  (null, 5, 17),
  (null, 13, 5),
  (null, 13, 15),
  (null, 4, 7),
  (null, 10, 8),
  (null, 7, 14),
  (null, 12, 9),
  (null, 11, 5),
  (null, 7, 3),
  (null, 8, 11),
  (null, 1, 12),
  (null, 9, 10),
  (null, 5, 4);
