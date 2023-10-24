package com.ineri.ineri_lk.repository;

import com.ineri.ineri_lk.model.Form;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author linqcod
 * @version 1.0
 */

@Repository
public interface FormRepository extends JpaRepository<Form, Long> {

    List<Form> findAllByAddressId(Long id);
    List<Form> findAllByUser_Username(String username);
}
