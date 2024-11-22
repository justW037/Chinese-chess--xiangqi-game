package com.bg.board_games.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bg.board_games.models.entity.Friend;

public interface FriendRepository extends JpaRepository<Friend, Long> {
     @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END " +
           "FROM Friend f " +
           "WHERE (f.user1.id = :userId AND f.user2.id = :targetId) " +
           "   OR (f.user1.id = :targetId AND f.user2.id = :userId)")
    boolean existsFriendRequest(Long userId, Long targetId);

    @Query("SELECT f FROM Friend f WHERE (f.user1.id = :userId AND f.user2.id = :targetId) OR (f.user1.id = :targetId AND f.user2.id = :userId)")
    Optional<Friend> findByUserIds(@Param("userId") Long userId, @Param("targetId") Long targetId);

    @Query("SELECT f FROM Friend f WHERE (f.user1.id = :userId OR f.user2.id = :userId) " +
           "AND (:status IS NULL OR f.status = :status)")
    Page<Friend> findFriendsByUserIdAndStatus(@Param("userId") Long userId, @Param("status") String status, Pageable pageable);

}
