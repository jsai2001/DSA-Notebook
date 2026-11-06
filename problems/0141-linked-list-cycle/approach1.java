/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
import java.util.*;

public class Solution {
    public boolean hasCycle(ListNode head) {
        Set<ListNode> seen = new HashSet<>(); // the nodes themselves, not their values // @viz init
        for (ListNode node = head; node != null; node = node.next) { // @viz walk
            if (!seen.add(node)) { // already there: back at a node we've passed // @viz found
                return true; // @viz found
            }
        }
        return false; // reached the end (null): no cycle // @viz none
    }
}
