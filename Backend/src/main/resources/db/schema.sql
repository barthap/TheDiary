
--ITEM TYPE
drop table if exists Type;
create table Type (
  TypeCode CHAR(1)  NOT NULL,
  Name     CHAR(30) NOT NULL,
  CONSTRAINT Type_PK PRIMARY KEY (TypeCode),
  CONSTRAINT Type_AK UNIQUE (Name)
);

-- ENTITY BASE - ITEM
-- Only ItemID has auto-generated ID, all other entity types have same ID as Item
drop table if exists Items;
create table Items (
  ItemId          integer           not null,
  TypeCode        CHAR(1)           not null,
  CreatedDateTime timestamp         not null,
  UpdatedDateTime timestamp         not null,


  constraint Item_PK primary key (ItemId),
  constraint Item_to_Type_FK foreign key (TypeCode) references Type (TypeCode)
);

-- ENTITY TYPES
drop table if exists Story;
create table Story (
  StoryId       integer      not null,
  StoryDateTime timestamp    not null,
  Header        varchar(255),
  Content       text     not null,

  constraint Story_PK primary key (StoryId),
  constraint Story_to_Item_FK foreign key (StoryId) references Items (ItemId)
);

drop table if exists Photos;
create table Photos (
  PhotoId     integer      not null,
  Filename    char(60) not null,
  Title       char(60) not null,
  Description text,

  constraint Photo_PK primary key (PhotoId),
  constraint Photo_to_Item_FK foreign key (PhotoId) references Items (ItemId)
);

drop table if exists People;
create table People (
  PersonId    integer      not null,
  FullName    char(50) not null,
  BirthDate   date,
  Description text,

  constraint People_PK primary key (PersonId),
  constraint People_to_Item_FK foreign key (PersonId) references Items (ItemId)
);

drop table if exists Documents;
create table Documents (
  DocumentId integer         not null,
  Title      varchar(50) not null,
  Type       varchar(20) not null, -- Type, raw Enum Value, can be embedded markdown or external word/pdf
  Filename   varchar(60),
  Content    text,

  constraint Documents_PK primary key (DocumentId),
  constraint Docs_to_Item_FK foreign key (DocumentId) references Items (ItemId)
);

drop table if exists Files;
create table Files (
  FileId      integer      not null,
  Filename    char(60) not null,
  Title       char(60) not null,
  Description text,

  constraint File_PK primary key (FileId),
  constraint File_to_Item_FK foreign key (FileId) references Items (ItemId)
);

-- REFERENCE TABLE
drop table if exists Reference;
create table Reference (
  ReferenceId integer not null,
  SourceId    integer not null,
  TargetId    integer not null,

  constraint Ref_PK primary key (ReferenceId),
  constraint Ref_AK unique (SourceId, TargetId),
  constraint Source_to_Item_FK foreign key (SourceId) references Items (ItemId),
  constraint Target_to_Item_FK foreign key (TargetId) references Items (ItemId)
);

--ENTITY VIEWS - They are fetched by app
drop view if exists StoryView;
create view StoryView as
  select
    I.ItemId AS Id,
    I.CreatedDateTime,
    I.UpdatedDateTime,
    S.Header,
    S.StoryDateTime,
    S.Content
  from Items I
    JOIN Story S on I.ItemId = S.StoryId;

drop view if exists FileView;
create view FileView as
  select
    I.ItemId AS Id,
    I.CreatedDateTime,
    I.UpdatedDateTime,
    F.Title,
    F.Filename,
    F.Description
  from Items I
    JOIN Files F on I.ItemId = F.FileId;


drop view if exists PhotoView;
create view PhotoView as
  select
    I.ItemId AS Id,
    I.CreatedDateTime,
    I.UpdatedDateTime,
    P.Title,
    P.Filename,
    P.Description
  from Items I
    JOIN Photos P on I.ItemId = P.PhotoId;


drop view if exists DocumentView;
create view DocumentView as
  select
    I.ItemId as Id,
    I.CreatedDateTime,
    I.UpdatedDateTime,
    D.Type,
    D.Title,
    D.Content,
    D.Filename
  from Items I
    join Documents D on I.ItemId = D.DocumentId;


drop view if exists PersonView;
create view PersonView as
  select
    I.ItemId as Id,
    I.CreatedDateTime,
    I.UpdatedDateTime,
    P.FullName,
    P.BirthDate,
    P.Description
  from Items I
    join People P on I.ItemId = P.PersonId;


-- REFERENCE VIEW - THE ONLY RIGHT WAY TO ACCESS REFERENCES ;)
drop view if exists ReferenceView;
create view ReferenceView as
  select
    I.ItemId      as Id,
    IT.TypeCode   as Type,
    S.StoryDateTime,
    S.Header      as StoryHeader,
    F.Title       as FileTitle,
    P.FullName    as PersonName,
    D.Title       as DocumentTitle,
    P2.Title      as PhotoTitle
  from Items I
    join Type IT on I.TypeCode = IT.TypeCode
    left join Story S on S.StoryId = I.ItemId
    left join People P on I.ItemId = P.PersonId
    left join Documents D on I.ItemId = D.DocumentId
    left join Photos P2 on I.ItemId = P2.PhotoId
    left join Files F on F.FileId = I.ItemId;

-- AND VERY USEFUL HELPER VIEWS
drop view if exists ReferencedIn;
create view ReferencedIn as
  select
    RV.*,
    R.ReferenceId,
    R.TargetId
  from ReferenceView RV
    join Reference R on R.SourceId = RV.Id;

drop view if exists ReferencesTo;
create view ReferencesTo as
  select
    RV.*,
    R.ReferenceId,
    R.SourceId
  from ReferenceView RV
    join Reference R on R.TargetId = RV.Id;


-- FULL TEXT SEARCH
drop table if exists fts_story;
create virtual table fts_story USING FTS5(story, title);

drop table if exists fts_document;
create virtual table fts_document USING FTS5(document, title);

drop table if exists fts_person;
create virtual table fts_person USING FTS5(name, description);

drop table if exists fts_photo;
create virtual table fts_photo USING FTS5(title, description);

drop table if exists fts_file;
create virtual table fts_file USING FTS5(filename, title, description);


-- FULL TEXT SEARCH TRIGGERS

-- STORY
DROP TRIGGER IF EXISTS after_story_insert;
DROP TRIGGER IF EXISTS after_story_update;
DROP TRIGGER IF EXISTS after_story_delete;

CREATE TRIGGER after_story_insert AFTER INSERT ON Story BEGIN
  INSERT INTO fts_story (rowid, story, title) VALUES (new.StoryId, new.Content, new.Header);
end;
CREATE TRIGGER after_story_update UPDATE OF Content, Header ON Story BEGIN
  UPDATE fts_story SET story=new.Content, title=new.Header WHERE rowid=old.StoryId;
end;
CREATE TRIGGER after_story_delete AFTER DELETE ON Story BEGIN
  DELETE FROM story_fts WHERE rowid=old.StoryId;
end;

-- DOCUMENT
DROP TRIGGER IF EXISTS after_doc_insert;
DROP TRIGGER IF EXISTS after_doc_update;
DROP TRIGGER IF EXISTS after_doc_delete;

CREATE TRIGGER after_doc_insert AFTER INSERT ON Documents BEGIN
  INSERT INTO fts_document (rowid, document, title) VALUES (new.DocumentId, new.Content, new.Title);
end;
CREATE TRIGGER after_doc_update UPDATE OF Content, Title ON Documents BEGIN
  UPDATE fts_document SET document=new.Content, title=new.Title WHERE rowid=old.DocumentId;
end;
CREATE TRIGGER after_doc_delete AFTER DELETE ON Documents BEGIN
  DELETE FROM fts_document WHERE rowid=old.DocumentId;
end;

-- PERSON
DROP TRIGGER IF EXISTS after_person_insert;
DROP TRIGGER IF EXISTS after_person_update;
DROP TRIGGER IF EXISTS after_person_delete;

CREATE TRIGGER after_person_insert AFTER INSERT ON People BEGIN
  INSERT into fts_person (rowid, name, description) VALUES (new.PersonId, new.FullName, new.Description);
end;
CREATE TRIGGER after_person_update UPDATE OF FullName, Description ON People BEGIN
  UPDATE fts_person SET name=new.FullName, description=new.Description WHERE rowid=old.PersonId;
end;
CREATE TRIGGER after_person_delete AFTER DELETE ON People BEGIN
  DELETE FROM fts_person WHERE rowid=old.PersonId;
end;

-- PHOTO
DROP TRIGGER IF EXISTS after_photo_insert;
DROP TRIGGER IF EXISTS after_photo_update;
DROP TRIGGER IF EXISTS after_photo_delete;

CREATE TRIGGER after_photo_insert AFTER INSERT ON Photos BEGIN
  INSERT into fts_photo (rowid, title, description) VALUES (new.PhotoId, new.Title, new.Description);
end;
CREATE TRIGGER after_photo_update UPDATE OF Title, Description ON Photos BEGIN
  UPDATE fts_photo SET title=new.Title, description=new.Description WHERE rowid=old.PhotoId;
end;
CREATE TRIGGER after_photo_delete AFTER DELETE ON Photos BEGIN
  DELETE FROM fts_photo WHERE rowid=old.PhotoId;
end;

-- FILE
DROP TRIGGER IF EXISTS after_file_insert;
DROP TRIGGER IF EXISTS after_file_update;
DROP TRIGGER IF EXISTS after_file_delete;

CREATE TRIGGER after_file_insert AFTER INSERT ON Files BEGIN
  INSERT into fts_file (rowid, filename, title, description) VALUES (new.FileId, new.Filename, new.Title, new.Description);
end;
CREATE TRIGGER after_file_update UPDATE OF Filename, Title, Description ON Files BEGIN
  UPDATE fts_file SET filename=new.Filename, title=new.Title, description=new.Description WHERE rowid=old.FileId;
end;
CREATE TRIGGER after_file_delete AFTER DELETE ON Files BEGIN
  DELETE FROM fts_file WHERE rowid=old.FileId;
end;
