package com.bg.board_games.mappers;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import com.bg.board_games.dtos.userDtos.UserRegisterDTO;
import com.bg.board_games.dtos.userDtos.UserUpdateDTO;
import com.bg.board_games.models.entity.User;
import com.bg.board_games.responses.user.UserDetailResponse;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toUser(UserRegisterDTO userRegisterDTO);

    @Mapping(target = "dateOfBirth", source = "user.dateOfBirth")
    @Mapping(target = "role", source = "user.role")
    UserDetailResponse toUserDetailResponse(User user);

     
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "password", ignore = true) 
    void updateUserFromDto(UserUpdateDTO userUpdateDTO, @MappingTarget User user);
}
