import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
class Solution {
    public int lastStoneWeight(int[] stones) {
        List<Integer> s = new ArrayList<>(); // @viz init
        for (int w : stones) s.add(w); // @viz init
        Collections.sort(s); // sort once, then keep it sorted // @viz init
        while (s.size() > 1) { // @viz loop
            int y = s.remove(s.size() - 1); // heaviest // @viz take
            int x = s.remove(s.size() - 1); // second heaviest // @viz take
            if (y != x) { // @viz smash
                int d = y - x; // @viz insert
                int at = Collections.binarySearch(s, d); // binary search for its place... // @viz insert
                s.add(at >= 0 ? at : -at - 1, d); // ...then insert there (a negative result encodes where it would go) // @viz insert
            }
        }
        return s.isEmpty() ? 0 : s.get(0); // @viz return
    }
}
