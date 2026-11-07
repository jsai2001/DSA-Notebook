import java.util.*;
class Solution {
    public int missingNumber(int[] nums) {
        Arrays.sort(nums); // @viz sort
        for (int i = 0; i < nums.length; i++) // sorted, the value at index i should be i // @viz scan
            if (nums[i] != i) return i; // the first gap // @viz found
        return nums.length; // 0..n-1 are all there: n is missing // @viz end
    }
}
