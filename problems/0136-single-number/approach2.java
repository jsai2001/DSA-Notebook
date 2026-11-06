import java.util.*;

class Solution {
    public int singleNumber(int[] nums) {
        Arrays.sort(nums); // equal values end up side by side (sorts the input) // @viz sort
        for (int i = 0; i + 1 < nums.length; i += 2) { // look at pairs (0, 1), (2, 3), ... // @viz pair
            if (nums[i] != nums[i + 1]) { // this pair is broken: nums[i] is the single one // @viz broken
                return nums[i]; // @viz broken
            }
        }
        return nums[nums.length - 1]; // every pair matched: the single one is last // @viz last
    }
}
