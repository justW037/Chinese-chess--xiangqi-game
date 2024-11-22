package com.bg.board_games.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bg.board_games.models.entity.Point;

public interface PointRepository extends JpaRepository<Point, Long> {
    Point findByUserIdAndType(Long userId, String type);
}
