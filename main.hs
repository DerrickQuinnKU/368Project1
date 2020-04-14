sorted :: [Int] -> Bool
sorted [] = True
sorted [a] = True
sorted (x:y:xs) = x <= y && sorted (y:xs)

sort :: [Int] -> [Int]
sort [] = []
sort [a] = [a]
sort xs = sort (filter (\x -> x < maximum xs) xs ) ++ filter (\x -> x == maximum xs) xs
