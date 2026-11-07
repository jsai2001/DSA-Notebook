import java.util.*;
class Solution {
    private int[] a;
    private final Map<Integer, Integer> memo = new HashMap<>(); // remaining balloons (as a bitmask) -> the most coins from bursting them all // @viz init
    public int maxCoins(int[] nums) {
        a = nums; // @viz init
        memo.clear(); // @viz init
        return best((1 << a.length) - 1); // every balloon is still there // @viz return
    }
    private int best(int mask) { // @viz call
        if (mask == 0) return 0; // @viz base
        Integer got = memo.get(mask); // @viz memo
        if (got != null) return got; // @viz memo
        List<Integer> alive = new ArrayList<>(); // @viz memo
        for (int i = 0; i < a.length; i++) if ((mask >> i & 1) == 1) alive.add(i); // @viz memo
        int top = 0; // @viz try
        for (int k = 0; k < alive.size(); k++) { // burst balloon alive[k] next: its neighbours are the nearest alive ones // @viz try
            int left = k > 0 ? a[alive.get(k - 1)] : 1; // @viz try
            int right = k + 1 < alive.size() ? a[alive.get(k + 1)] : 1; // @viz try
            top = Math.max(top, left * a[alive.get(k)] * right + best(mask & ~(1 << alive.get(k)))); // @viz try
        }
        memo.put(mask, top); // @viz memo
        return top; // @viz memo
    }
}
