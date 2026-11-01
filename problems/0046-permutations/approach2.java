import java.util.ArrayList;
import java.util.List;
class Solution {
    private List<List<Integer>> result;
    public List<List<Integer>> permute(int[] nums) {
        result = new ArrayList<>(); // @viz init
        backtrack(nums, 0); // @viz init
        return result; // @viz return
    }
    private void backtrack(int[] nums, int k) { // positions 0..k-1 are fixed; choose what goes at position k // @viz call
        if (k == nums.length) { // @viz done
            List<Integer> perm = new ArrayList<>(); // @viz done
            for (int x : nums) perm.add(x); // @viz done
            result.add(perm); // @viz done
            return; // @viz done
        }
        for (int i = k; i < nums.length; i++) { // any number not fixed yet can go at k // @viz swap
            swap(nums, k, i); // bring nums[i] to position k // @viz swap
            backtrack(nums, k + 1); // @viz swap
            swap(nums, k, i); // swap back, so the order is restored // @viz undo
        }
    }
    private void swap(int[] a, int i, int j) {
        int t = a[i];
        a[i] = a[j];
        a[j] = t;
    }
}
