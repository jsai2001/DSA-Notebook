import java.util.*;

class Solution {
    public int singleNumber(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>(); // @viz init
        for (int x : nums) { // @viz count
            count.merge(x, 1, Integer::sum); // @viz count
        }
        for (Map.Entry<Integer, Integer> e : count.entrySet()) { // @viz find
            if (e.getValue() == 1) return e.getKey(); // the one value seen once // @viz find
        }
        return 0; // not reached: the input always has one // @viz find
    }
}
