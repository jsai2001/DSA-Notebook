#include <string>
#include <unordered_map>
class Trie {
public:
    Trie() : root(new Node()) {} // a node maps each letter to a child node // @viz init
    void insert(std::string word) {
        Node* node = root; // @viz insert
        for (char ch : word) { // @viz insert
            Node*& next = node->child[ch]; // @viz insert
            if (!next) next = new Node(); // follow the letter, adding a node if it's missing // @viz insert
            node = next; // @viz insert
        }
        node->end = true; // a word ends here // @viz end
    }
    bool search(std::string word) {
        Node* node = walk(word); // @viz search
        return node && node->end; // spelled out, and a word ends exactly here // @viz search
    }
    bool startsWith(std::string prefix) {
        return walk(prefix) != nullptr; // spelled out is enough // @viz prefix
    }
private:
    struct Node {
        std::unordered_map<char, Node*> child;
        bool end = false;
    };
    Node* root;
    Node* walk(const std::string& s) { // the node reached by spelling s, or null // @viz walk
        Node* node = root; // @viz walk
        for (char ch : s) { // @viz walk
            auto it = node->child.find(ch); // @viz walk
            if (it == node->child.end()) return nullptr; // @viz walk
            node = it->second; // @viz walk
        }
        return node; // @viz walk
    }
};
