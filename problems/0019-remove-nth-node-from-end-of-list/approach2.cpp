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
#include <stack>
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0, head); // @viz dummy
        std::stack<ListNode*> st; // @viz dummy
        for (ListNode* node = &dummy; node; node = node->next) st.push(node); // push every node, dummy included // @viz push
        for (int k = 0; k < n; ++k) st.pop(); // the last n nodes come off; the n-th one is the target // @viz pop
        ListNode* prev = st.top(); // now on top: the node just before the target // @viz unlink
        ListNode* target = prev->next; // @viz unlink
        prev->next = target->next; // @viz unlink
        delete target; // @viz unlink
        return dummy.next; // @viz return
    }
};
