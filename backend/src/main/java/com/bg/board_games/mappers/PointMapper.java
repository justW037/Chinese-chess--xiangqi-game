package com.bg.board_games.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.bg.board_games.models.entity.Point;
import com.bg.board_games.models.entity.User;

@Mapper(componentModel = "spring")
public interface PointMapper {
   
    @Mapping(target = "user.id", source = "userId")
    Point toPoint(Long userId, int point, String type);
}
