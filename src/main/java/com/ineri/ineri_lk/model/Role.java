package com.ineri.ineri_lk.model;

import org.springframework.security.core.GrantedAuthority;

/**
 * @author linqcod
 */

public enum Role implements GrantedAuthority {
    ROLE_USER,
    ROLE_ADMIN;

    @Override
    public String getAuthority() {
        return name();
    }


}