create database bookStoreDB;
use bookStoreDB;

create table Category(
Id int primary key identity(1,1),
CategoryName varchar(255)
);

select * from Category;

create table Book(
Id int primary key identity(1,1),
BookName varchar(255),
Author varchar(255),
Price varchar(255),
CategoryId int FOREIGN KEY REFERENCES Category(Id)
);

select * from Book;

create table [User](
Id int primary key identity(1,1),
FName varchar(255),
LName varchar(255),
Birthday date,
Phone varchar(50),
Email varchar(255),
Username varchar(255),
PasswordHash varbinary(MAX),
PasswordSalt varbinary(MAX)
)

alter table [User] Add test int;

select * from [User];

CREATE VIEW Year_old AS
SELECT *,(YEAR(GETDATE())-YEAR(Birthday)) as Year_old
FROM [User];

select * from Year_old

select * from [User] u
join Year_old o on u.ID = o.ID

create procedure Yearold_Mature
as
begin
	select FName,LName,Sum(Year_old) as Mature from Year_old
group by LName,FName Having Sum(Year_old)>16
end;

EXECUTE Yearold_Mature ;


CREATE PROCEDURE storedBook
    @IdBook   INT
AS
BEGIN
    SELECT * FROM Book WHERE Id=@IdBook 
END

EXEC storedBook @IdBook=1;

insert into Category values('Fairy tale');
insert into Category values('Ghos[dbo].[Year_old]t story');
insert into Category values('Fiction');
insert into Category values('Funny story');
insert into Category values('Poem ');

select * from Category;

insert into Book values ('The Busy Executive','Smith','285000',1);
insert into Book values ('Surreptitious Balance Sheets','Karsen','200000',2);
insert into Book values ('You Can Combat Computer Stress!','Greene','500000',3);
insert into Book values ('Straight Talk About Computers','Yokomoto','150000',4);
insert into Book values ('Silicon Valley Gastronomic Treats','Panteley','350000',5);


select * from Book;


select BookName, sum (Id) as sumId
from Book
group by BookName
