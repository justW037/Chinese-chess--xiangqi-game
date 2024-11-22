package com.bg.board_games.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bg.board_games.models.entity.UserGame;

public interface UserGameRepository extends JpaRepository<UserGame, Long> {
}
