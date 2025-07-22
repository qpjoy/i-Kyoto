SELECT created_at as date, sum(i.price * i.quantity) as sum 
FROM orders O 
JOIN order_items i on o.id = i.order_id
GROUP BY date; 