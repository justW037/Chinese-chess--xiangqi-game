package com.bg.board_games.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.bg.board_games.models.entity.Token;
import com.bg.board_games.models.entity.User;
import com.bg.board_games.responses.user.LoginResponse;

@Mapper(componentModel = "spring")
public interface LoginMapper {

    @Mapping(target = "message", constant = "Login successfully")
    @Mapping(target = "token", source = "token")
    @Mapping(target = "refreshToken", source = "refreshToken.refreshToken")
    @Mapping(target = "tokenType", source = "refreshToken.tokenType")
    @Mapping(target = "username", source = "user.username")
    @Mapping(target = "role", source = "user.role")
    @Mapping(target = "id", source = "user.id")
    LoginResponse toLoginResponse(User user, String token, Token refreshToken);
   
}
