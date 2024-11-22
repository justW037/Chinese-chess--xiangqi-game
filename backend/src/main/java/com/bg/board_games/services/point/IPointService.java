package com.bg.board_games.services.point;

import com.bg.board_games.models.entity.Point;

public interface IPointService {
    Point addPoint(Long userId, int point, String type) throws Exception;
    Point getPointByUserAndType(Long userId, String type) throws Exception;
}
