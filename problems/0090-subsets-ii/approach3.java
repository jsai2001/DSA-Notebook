import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        int[] sorted = nums.clone(); // @viz init
        Arrays.sort(sorted); // equal numbers side by side // @viz init
        List<List<Integer>> result = new ArrayList<>(); // @viz init
        result.add(new ArrayList<>()); // @viz init
        int added = 0; // where the subsets made in the last round start // @viz init
        for (int i = 0; i < sorted.length; i++) { // @viz next
            // A repeat of the last number only extends the subsets that already used it (made last round).
            int begin = (i > 0 && sorted[i] == sorted[i - 1]) ? added : 0; // @viz begin
            added = result.size(); // @viz begin
            for (int j = begin; j < added; j++) { // @viz extend
                List<Integer> grown = new ArrayList<>(result.get(j)); // @viz extend
                grown.add(sorted[i]); // @viz extend
                result.add(grown); // @viz extend
            }
        }
        return result; // @viz return
    }
}
