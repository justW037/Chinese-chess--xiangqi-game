package com.bg.board_games.controllers;

import java.util.stream.Collectors;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bg.board_games.dtos.friendDtos.FriendRequestDTO;
import com.bg.board_games.mappers.FriendMapper;
import com.bg.board_games.models.entity.Friend;
import com.bg.board_games.responses.friend.FriendRequestResponse;
import com.bg.board_games.responses.friend.FriendResponse;
import com.bg.board_games.responses.friend.FriendInfoResponse;
import com.bg.board_games.responses.friend.FriendListResponse;
import com.bg.board_games.services.friend.IFriendService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("${api.prefix}/friends")
@RequiredArgsConstructor
public class FriendController {
    private final IFriendService friendService;
    private final FriendMapper friendMapper;

    @PostMapping("add-friend")
    public ResponseEntity<FriendRequestResponse> addFriendRequest(@RequestHeader("Authorization") String authorizationHeader, @Valid @RequestBody FriendRequestDTO friendRequestDTO) throws Exception {
        FriendRequestResponse response = new FriendRequestResponse();
        String extractedToken = authorizationHeader.substring(7);
        Friend newFriendRequest = friendService.createFriendRequest(extractedToken, friendRequestDTO);

        FriendInfoResponse friendResponse = friendMapper.toFriendInfoResponse(newFriendRequest);

        response.setFriendResponse(friendResponse);
        response.setMessage("Sent friend request successfully");
        return ResponseEntity.ok(response);

    }

    @PutMapping("accept/{friendId}")
    public ResponseEntity<FriendRequestResponse> acceptFriendRequest(@RequestHeader("Authorization") String authorizationHeader,  @PathVariable(required = true) Long friendId) throws Exception {
        FriendRequestResponse response = new FriendRequestResponse();
        String extractedToken = authorizationHeader.substring(7);

        Friend acceptedFriend = friendService.acceptFriendRequest(extractedToken, friendId);

        FriendInfoResponse friendResponse = friendMapper.toFriendInfoResponse(acceptedFriend);

        response.setFriendResponse(friendResponse);
        response.setMessage("Accepted friend request successfully");
        return ResponseEntity.ok(response);

    }

    @PutMapping("block/{targetId}")
    public ResponseEntity<FriendRequestResponse> blockFriend(@RequestHeader("Authorization") String authorizationHeader,  @PathVariable(required = true) Long targetId) throws Exception {
        FriendRequestResponse response = new FriendRequestResponse();
        String extractedToken = authorizationHeader.substring(7);

        Friend blockedFriend = friendService.blockFriend(extractedToken, targetId);

        FriendInfoResponse friendResponse = friendMapper.toFriendInfoResponse(blockedFriend);

        response.setFriendResponse(friendResponse);
        response.setMessage("Blocked friend successfully");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("unfriend/{targetId}")
    public ResponseEntity<?> deleteFriend(@RequestHeader("Authorization") String authorizationHeader,  @PathVariable(required = true) Long targetId) throws Exception {

        String extractedToken = authorizationHeader.substring(7);

        friendService.deleteFriend(extractedToken, targetId);

        return ResponseEntity.ok().body("Unfriend successfully");
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<FriendListResponse> getAllFriendByUserId(
        @RequestParam(defaultValue = "", required = false) String status,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int limit,
        @PathVariable Long userId,
        @RequestHeader("Authorization") String authorizationHeader) throws Exception {

        if (status.isEmpty()) {
            status = null;
        }
        String extractedToken = authorizationHeader.substring(7);
        PageRequest pageRequest = PageRequest.of(page, limit, Sort.by("createdAt").descending());

        Page<Friend> friends = friendService.getFriendList(extractedToken, userId, status, pageRequest);

        List<FriendResponse> friendResponses = friends.getContent().stream()
        .map(friend -> friendMapper.toFriendResponse(friend, userId))
        .collect(Collectors.toList());

        return ResponseEntity.ok(FriendListResponse.builder()
            .friends(friendResponses)
            .totalPages(friends.getTotalPages())
            .message("Get friend list successfully")
            .build());
    }
}
