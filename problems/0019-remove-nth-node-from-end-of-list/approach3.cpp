/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0, head); // in front of head, so removing head isn't a special case // @viz dummy
        ListNode* fast = &dummy; // @viz dummy
        ListNode* slow = &dummy; // @viz dummy
        for (int k = 0; k <= n; ++k) fast = fast->next; // fast goes n + 1 steps ahead: n nodes between them // @viz gap
        while (fast) { // move both until fast falls off the end // @viz move
            fast = fast->next; // @viz move
            slow = slow->next; // @viz move
        }
        ListNode* target = slow->next; // slow is just before the target // @viz unlink
        slow->next = target->next; // skip it // @viz unlink
        delete target; // @viz unlink
        return dummy.next; // @viz return
    }
};
