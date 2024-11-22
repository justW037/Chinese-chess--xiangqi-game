package com.bg.board_games.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bg.board_games.models.entity.Game;

import java.util.List;


public interface GameRepository extends JpaRepository<Game, Long> {
    @Query("SELECT g FROM Game g JOIN g.userGames ug WHERE ug.user.id = :userId AND g.status = 'IN_PROGRESS'")  
    Optional<Game> findInProgressGameByUserId(@Param("userId") Long userId);  
}
