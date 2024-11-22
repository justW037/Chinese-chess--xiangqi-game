package com.bg.board_games.responses.friend;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FriendListResponse {
    @JsonProperty("message")
    private String message;

    @JsonProperty("friends")
    private List<FriendResponse> friends;

    @JsonProperty("total_page")
    private int totalPages; 
}
