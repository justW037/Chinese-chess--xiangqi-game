package com.bg.board_games.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bg.board_games.models.entity.Tournament;

public interface TournamentRepository extends JpaRepository<Tournament, Long> {

}
