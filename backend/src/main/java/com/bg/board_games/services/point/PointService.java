package com.bg.board_games.services.point;

import org.springframework.stereotype.Service;

import com.bg.board_games.exceptions.DataNotFoundException;
import com.bg.board_games.mappers.PointMapper;
import com.bg.board_games.models.entity.Point;
import com.bg.board_games.models.entity.User;
import com.bg.board_games.repositories.PointRepository;
import com.bg.board_games.repositories.UserRepository;
import com.bg.board_games.services.user.IUserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class PointService implements IPointService {
    private final UserRepository userRepository;
    private final PointMapper pointMapper;
    private final PointRepository pointRepository;

    @Override
    public Point addPoint(Long userId, int point, String type) throws Exception{
        if(!userRepository.existsById(userId)){
            throw new DataNotFoundException("User not found");
        }
        Point pointToAdd = pointMapper.toPoint(userId, point, type);        
        return pointRepository.save(pointToAdd);
    }

    @Override
    public Point getPointByUserAndType(Long userId, String type) throws Exception {
        if(!userRepository.existsById(userId)){
            throw new DataNotFoundException("User not found");
        }
        return pointRepository.findByUserIdAndType(userId, type);
    }
}
