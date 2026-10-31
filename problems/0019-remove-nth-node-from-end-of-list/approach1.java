/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        int length = 0; // @viz count
        for (ListNode node = head; node != null; node = node.next) length++; // first pass: count the nodes // @viz count
        ListNode dummy = new ListNode(0, head); // in front of head, so removing head isn't a special case // @viz dummy
        ListNode prev = dummy; // @viz dummy
        for (int k = 0; k < length - n; k++) prev = prev.next; // second pass: stop just before the target // @viz walk
        prev.next = prev.next.next; // skip over the target // @viz unlink
        return dummy.next; // @viz return
    }
}
