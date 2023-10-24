package com.ineri.ineri_lk.repository;

import com.ineri.ineri_lk.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @author linqcod
 */

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findById(Long id);
    List<User> findAll();

    void deleteByUsername(String username);
    void deleteById(Long id);
}