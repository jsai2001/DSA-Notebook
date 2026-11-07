class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        long total = 0; // @viz init
        for (int p : piles) total += p; // @viz init
        for (long k = (total + h - 1) / h;; k++) { // slower than sum / h can't finish; try every speed from there // @viz init, try, next
            long hours = 0; // @viz try
            for (int p : piles) hours += (p + k - 1) / k; // @viz try
            if (hours <= h) return (int) k; // @viz return
        }
    }
}
