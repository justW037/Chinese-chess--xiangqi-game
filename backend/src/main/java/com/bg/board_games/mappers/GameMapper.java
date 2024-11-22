package com.bg.board_games.mappers;


import java.time.LocalDateTime;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.bg.board_games.models.entity.Game;
import com.bg.board_games.models.entity.User;
import com.bg.board_games.models.entity.UserGame;

@Mapper(componentModel = "spring")
public interface GameMapper {
    
    @Mapping(target = "user.id", source = "userId")
    @Mapping(target = "game.id", source = "gameId")
    UserGame toUserGame(Long userId, Long gameId, int pointsEarned);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateGame(String status, Long winnerId, LocalDateTime endTime, @MappingTarget Game game);
}
