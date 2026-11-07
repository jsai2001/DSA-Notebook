class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length]; // tails[L] = the smallest last value of any increasing subsequence of length L + 1 // @viz init
        int len = 0; // @viz init
        for (int x : nums) { // @viz each
            int lo = 0, hi = len; // binary search for the first tail >= x (tails[0..len) is sorted) // @viz search
            while (lo < hi) { // @viz search
                int mid = (lo + hi) >>> 1; // @viz search
                if (tails[mid] < x) lo = mid + 1; // @viz search
                else hi = mid; // @viz search
            }
            tails[lo] = x; // a smaller end for length lo + 1, or a new, longer one // @viz extend, replace
            if (lo == len) len++; // @viz extend
        }
        return len; // @viz return
    }
}
