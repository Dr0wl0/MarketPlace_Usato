package it.profice.corso.cart_service.repositroy;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import it.profice.corso.cart_service.model.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByUserUuid( String userUuid );
    Optional<Cart> findByUuid( String uuid);

    @Query(value = "SELECT c.user_uuid FROM Cart c WHERE c.user_uuid = :userUuid", nativeQuery = true)
    String findUserUuid(String userUuid);
}

