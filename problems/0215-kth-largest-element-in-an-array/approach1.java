import java.util.*;
class Solution {
    public int findKthLargest(int[] nums, int k) {
        Arrays.sort(nums); // smallest first // @viz sort
        return nums[nums.length - k]; // the k-th from the end // @viz pick
    }
}
