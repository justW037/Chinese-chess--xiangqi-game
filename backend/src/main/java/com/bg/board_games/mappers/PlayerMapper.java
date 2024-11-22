package com.bg.board_games.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.bg.board_games.models.entity.Point;
import com.bg.board_games.models.entity.User;
import com.bg.board_games.responses.game.PlayerInMatchResponse;

@Mapper(componentModel = "spring")
public interface PlayerMapper {
    @Mapping(target = "id", source = "user.id")
    @Mapping(target = "playerName", source = "user.username")
    @Mapping(target = "point", source = "point.point")
    @Mapping(target = "country", source = "user.country")
    PlayerInMatchResponse toPlayerInMatchResponse(User user, Point point);
}
