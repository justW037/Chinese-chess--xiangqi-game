package com.bg.board_games.services.friend;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.bg.board_games.dtos.friendDtos.FriendRequestDTO;
import com.bg.board_games.models.entity.Friend;

public interface IFriendService {
    Friend createFriendRequest(String token, FriendRequestDTO friendRequestDTO) throws Exception;
    Friend acceptFriendRequest(String token, Long friendId) throws Exception;
    Friend blockFriend(String token, Long targetId) throws Exception;
    void deleteFriend(String token, Long targetId) throws Exception;
    Page<Friend> getFriendList(String token, Long userId, String status, Pageable pageable) throws Exception;
}
