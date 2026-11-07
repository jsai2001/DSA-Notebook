import java.util.*;
class Solution {
    public boolean isHappy(int n) {
        Set<Integer> seen = new HashSet<>(); // every number met so far // @viz init
        while (n != 1) { // @viz loop
            if (!seen.add(n)) return false; // met before: the numbers go round in a loop without 1 // @viz repeat, step
            n = next(n); // @viz step
        }
        return true; // @viz happy
    }
    private int next(int n) { // the sum of the squares of the digits
        int sum = 0;
        for (; n > 0; n /= 10) sum += (n % 10) * (n % 10);
        return sum;
    }
}
