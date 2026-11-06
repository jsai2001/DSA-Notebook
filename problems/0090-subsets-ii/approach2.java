import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
class Solution {
    private int[] sorted;
    private List<List<Integer>> result;
    private List<Integer> path;
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        sorted = nums.clone(); // @viz init
        Arrays.sort(sorted); // equal numbers side by side // @viz init
        result = new ArrayList<>(); // @viz init
        path = new ArrayList<>(); // @viz init
        backtrack(0); // @viz init
        return result; // @viz return
    }
    private void backtrack(int start) { // path is a subset; extend it only with numbers after it // @viz call
        result.add(new ArrayList<>(path)); // every path is an answer, even the empty one // @viz record
        for (int i = start; i < sorted.length; i++) { // @viz choose
            if (i > start && sorted[i] == sorted[i - 1]) continue; // same number in the same place: same subsets again // @viz dup
            path.add(sorted[i]); // @viz choose
            backtrack(i + 1); // @viz choose
            path.remove(path.size() - 1); // undo, so the next number can take this place // @viz undo
        }
    }
}
