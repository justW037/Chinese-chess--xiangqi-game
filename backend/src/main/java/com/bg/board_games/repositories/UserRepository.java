package com.bg.board_games.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bg.board_games.models.entity.User;

public interface UserRepository  extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
}
