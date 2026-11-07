import java.util.*;
class Solution {
    public boolean containsDuplicate(int[] nums) {
        Arrays.sort(nums); // equal values end up side by side // @viz sort
        for (int i = 1; i < nums.length; i++) // @viz scan
            if (nums[i] == nums[i - 1]) return true; // @viz found
        return false; // @viz none
    }
}
