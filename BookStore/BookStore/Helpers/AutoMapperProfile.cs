using AutoMapper;
using BookStore.Models.Users;
using BookStore.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Helpers
{
  public class AutoMapperProfile : Profile
  {
    public AutoMapperProfile()
    {
      CreateMap<User, UserModel>();
      CreateMap<RegisterModel, User>();
      CreateMap<UpdateModel, User>();
    }
  }
}
